// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

// console.log("Hello from Functions!")

// serve(async (req) => {
//   const { name } = await req.json()
//   const data = {
//     message: `Hello ${name}!`,
//   }

//   return new Response(
//     JSON.stringify(data),
//     { headers: { "Content-Type": "application/json" } },
//   )
// })

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = 're_HGTZ6H2Z_7S5PEei6mZoNqhtmhDQVDjGk'

const handler = async (_request: Request): Promise<Response> => {

    const jsonData = await _request.json();
    console.log(jsonData);

    const questionId = jsonData.record.id;
    const userId = jsonData.record.user_id;
    const questionContent = jsonData.record.content;
    const type = jsonData.type ? jsonData.type : jsonData.record.type;

    // const user = await supabase.auth.api.getUserByCookie(_request);
    // console.log(user);

    // const questionData = await supabase.from('questions').select('*').eq('id', jsonData.id);
    // console.log(questionData);

    // if ( questionData.error) {
    //     return new Response(JSON.stringify(questionData.error), {
    //         status: 400,
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //       });
    // } else {
    //     const questionUser = await supabase.from('users').select('*').eq('id', questionData.data[0].user_id);
    //     console.log(questionUser);
    
      // const { from, to, subject, html } = await _request.json();

      let res;
      if ( type === 'INSERT' ) {

        const { from, to, subject, html } = { from: '', to: '', subject: '', html: ''};
        
        res = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${RESEND_API_KEY}`,
            },
            body: JSON.stringify({
            from: from || 'onboarding@resend.dev',
            to: to || 'echoesintospace@gmail.com',
            subject: subject || 'A question was submitted',
            html: html || `<h3>Congratulations! a question was created!</h3><br><p><bold>${JSON.stringify(jsonData)}</bold></p>`,
            }),
        });
      } else if ( type === 'UPDATE' ) {

        const { from, to, subject, html } = { from: '', to: '', subject: '', html: ''};
        
        try {
            const supabaseClient = createClient(
                // Supabase API URL - env var exported by default.
                Deno.env.get('SUPABASE_URL') ?? '',
                // Supabase API ANON KEY - env var exported by default.
                Deno.env.get('SUPABASE_ANON_KEY') ?? '',
                // Create client with Auth context of the user that called the function.
                // This way your row-level-security (RLS) policies are applied.
                { global: { headers: { Authorization: _request.headers.get('Authorization')! } } }
            )

            // const {
            //     data: { user },
            // } = await supabaseClient.auth.getUser();

            const questionUserData = await supabaseClient.auth.admin.getUserById(userId);
        
            if (questionUserData.error) {

                const { from, to, subject, html } = { from: '', to: '', subject: '', html: ''};
        
                res = await fetch('https://api.resend.com/emails', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${RESEND_API_KEY}`,
                    },
                    body: JSON.stringify({
                    from: from || 'onboarding@resend.dev',
                    to: to || 'echoesintospace@gmail.com',
                    subject: subject || 'ERROR!! A question was submitted: ' + JSON.stringify(questionUserData),
                    html: html || `<h3>Congratulations! a question was created!</h3><br><p><bold>${JSON.stringify(jsonData)}</bold></p>`,
                    }),
                });

                throw questionUserData.error;
            }

            const questionUser = questionUserData.data.user;

            const { from, to, subject, html } = { from: '', to: questionUser.email, subject: '', html: ''};
            
            res = await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${RESEND_API_KEY}`,
                },
                body: JSON.stringify({
                from: from || 'noreply@echoesintospace.com',
                to: to || 'echoesintospace@gmail.com',
                subject: subject || 'Your question was answered!!',
                html: html || `<bold>Congratulations! your question was answered!!</bold><h5>${questionContent}</h5><br><p>You can read the answer at <a target="_window" href="https://www.echoesintospace.com/question/${questionId}">here</a></p><br><p>Thank you for using Echoes in to Space!</p>`,
                }),
            });
        } catch (error) {

                res = await fetch('https://api.resend.com/emails', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${RESEND_API_KEY}`,
                    },
                    body: JSON.stringify({
                    from: from || 'onboarding@resend.dev',
                    to: to || 'echoesintospace@gmail.com',
                    subject: subject || 'THROWN ERROR!! A question was submitted: ' + JSON.stringify(error),
                    html: html || `<h3>Congratulations! a question was created!</h3><br><p><bold>${JSON.stringify(jsonData)}</bold></p>`,
                    }),
                });

                return new Response(JSON.stringify({ error: JSON.stringify(error) }), {
              headers: { 'Content-Type': 'application/json' },
              status: 400,
            })
          }
    } else {
        const { from, to, subject, html } = { from: '', to: '', subject: '', html: ''};
        
        res = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${RESEND_API_KEY}`,
            },
            body: JSON.stringify({
            from: from || 'onboarding@resend.dev',
            to: to || 'echoesintospace@gmail.com',
            subject: subject || '2 A question was submitted, type: [' + type + ']',
            html: html || `<h3>Congratulations! a question was created!</h3><br><p><bold>${JSON.stringify(jsonData)}</bold></p>`,
            }),
        });
}

      const data = res ? await res.json() : { message: 'No data' };
    
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    // }

}

serve(handler)
