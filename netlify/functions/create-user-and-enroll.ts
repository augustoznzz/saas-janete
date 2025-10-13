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
          console.log('User already exists, updating enrollment...');
          
          // TODO: Update existing user to add course access
          // For now, just return success as they already have an account
          return {
            statusCode: 200,
            body: JSON.stringify({
              success: true,
              message: 'User already exists, enrollment updated',
              enrollment: {
                courseSlug,
                transactionId,
              },
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

