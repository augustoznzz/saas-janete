import { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';

/**
 * Netlify Function to create user account and enroll in course after payment
 * 
 * This is called by the webhook after payment confirmation
 */

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { email, password, name, courseSlug, transactionId, cpf, phone } = JSON.parse(event.body || '{}');

    // Validate required fields
    if (!email || !password || !name || !courseSlug) {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          error: 'Missing required fields' 
        }),
      };
    }

    console.log('Creating user account for:', email);

    // Create user in Netlify Identity
    const identityUrl = process.env.URL || 'http://localhost:8888';
    const adminToken = process.env.NETLIFY_ADMIN_TOKEN || context.clientContext?.identity?.token;

    // First, try to signup the user
    try {
      const signupResponse = await fetch(`${identityUrl}/.netlify/identity/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          data: {
            full_name: name,
            cpf: cpf || '',
            phone: phone || '',
            enrolled_courses: [courseSlug],
            transaction_ids: [transactionId],
            created_via: 'checkout',
            created_at: new Date().toISOString(),
          },
        }),
      });

      if (signupResponse.ok) {
        const userData = await signupResponse.json();
        console.log('User created successfully:', email);

        // TODO: Send welcome email with course access
        // TODO: Store enrollment in database

        return {
          statusCode: 200,
          body: JSON.stringify({
            success: true,
            message: 'User created and enrolled successfully',
            user: {
              email: userData.email,
              id: userData.id,
            },
            enrollment: {
              courseSlug,
              transactionId,
            },
          }),
        };
      } else {
        const errorText = await signupResponse.text();
        console.error('Failed to create user:', errorText);
        
        // If user already exists, try to update their data instead
        if (errorText.includes('already') || errorText.includes('exists')) {
          console.log('User already exists, attempting to update enrollment via admin API...');

          if (!adminToken) {
            console.error('Missing NETLIFY_ADMIN_TOKEN. Cannot update existing user enrollment.');
            return {
              statusCode: 500,
              body: JSON.stringify({ error: 'Admin token not configured to update existing user.' }),
            };
          }

          // Find existing user by email
          const listRes = await fetch(`${identityUrl}/.netlify/identity/admin/users?email=${encodeURIComponent(email)}`, {
            headers: { Authorization: `Bearer ${adminToken}` },
          });
          if (!listRes.ok) {
            const t = await listRes.text();
            throw new Error(`Failed to lookup user by email: ${t || listRes.status}`);
          }
          const listData = await listRes.json();
          const existing = Array.isArray(listData) ? listData[0] : null;
          if (!existing?.id) {
            throw new Error('Existing user not found by email');
          }

          const currentMeta = existing.user_metadata || {};
          const enrolled: string[] = Array.isArray(currentMeta.enrolled_courses) ? currentMeta.enrolled_courses : [];
          const txs: string[] = Array.isArray(currentMeta.transaction_ids) ? currentMeta.transaction_ids : [];
          if (!enrolled.includes(courseSlug)) enrolled.push(courseSlug);
          if (transactionId && !txs.includes(transactionId)) txs.push(transactionId);

          const updateRes = await fetch(`${identityUrl}/.netlify/identity/admin/users/${existing.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${adminToken}`,
            },
            body: JSON.stringify({
              data: {
                ...currentMeta,
                full_name: currentMeta.full_name || name,
                cpf: currentMeta.cpf || (cpf || ''),
                phone: currentMeta.phone || (phone || ''),
                enrolled_courses: enrolled,
                transaction_ids: txs,
                updated_via: 'checkout_webhook',
                updated_at: new Date().toISOString(),
              },
            }),
          });
          if (!updateRes.ok) {
            const t = await updateRes.text();
            throw new Error(`Failed to update user enrollment: ${t || updateRes.status}`);
          }

          console.log('Existing user enrollment updated:', { email, courseSlug });
          return {
            statusCode: 200,
            body: JSON.stringify({
              success: true,
              message: 'User already existed. Enrollment updated.',
              enrollment: { courseSlug, transactionId },
            }),
          };
        }

        throw new Error(`Failed to create user: ${errorText}`);
      }
    } catch (error: any) {
      console.error('Error creating user:', error);
      throw error;
    }

  } catch (error: any) {
    console.error('Error in create-user-and-enroll:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to create user and enroll',
        message: error.message,
      }),
    };
  }
};

export { handler };

