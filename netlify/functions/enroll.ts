import { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';

/**
 * Netlify Function to handle course enrollment after payment confirmation
 * 
 * This function is called by the LiraPay webhook when payment is confirmed
 * It will:
 * 1. Validate the enrollment data
 * 2. Create/update user in database
 * 3. Grant course access
 * 4. Send confirmation email
 */

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { email, courseSlug, transactionId, customerData } = JSON.parse(event.body || '{}');

    // Validate required fields
    if (!email || !courseSlug || !transactionId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          error: 'Missing required fields: email, courseSlug, transactionId' 
        }),
      };
    }

    console.log('Processing enrollment:', {
      email,
      courseSlug,
      transactionId,
    });

    // TODO: Implement your database logic here
    // Example with Fauna DB or other database:
    
    // 1. Check if user exists, create if not
    // const user = await createOrGetUser({
    //   email,
    //   name: customerData?.name,
    //   cpf: customerData?.cpf,
    //   phone: customerData?.phone,
    // });

    // 2. Create enrollment record
    // const enrollment = await createEnrollment({
    //   userId: user.id,
    //   courseSlug,
    //   transactionId,
    //   enrolledAt: new Date().toISOString(),
    //   status: 'active',
    // });

    // 3. Grant course access (update progress, permissions, etc.)
    // await grantCourseAccess(user.id, courseSlug);

    // 4. Send confirmation email
    // await sendEnrollmentEmail({
    //   to: email,
    //   courseName: getCourseNameFromSlug(courseSlug),
    //   accessUrl: `${process.env.SITE_URL}/aluno/cursos/${courseSlug}`,
    // });

    // For now, just log the enrollment
    console.log('Enrollment processed successfully');

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Enrollment processed successfully',
        enrollment: {
          email,
          courseSlug,
          transactionId,
          enrolledAt: new Date().toISOString(),
        },
      }),
    };

  } catch (error: any) {
    console.error('Enrollment error:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to process enrollment',
        message: error.message,
      }),
    };
  }
};

// Helper function to get course name from slug
function getCourseNameFromSlug(slug: string): string {
  const courseNames: Record<string, string> = {
    'introducao-ao-bordado': 'Introdução ao Bordado',
  };
  return courseNames[slug] || 'Curso';
}

export { handler };

