import { ses } from "../config/aws.js";



export const sendMail = async(mail, subject,message)=>{
    try {
        const emailParams = {
            Destination: {
              ToAddresses: [ mail], // Corrected to use plantdata.email
            },
            Message: {
              Body: {
                Html: {
                  Charset: "UTF-8",
                  Data: message, // HTML content for the email body
                },
              },
              Subject: {
                Charset: "UTF-8",
                Data: subject, // Dynamic subject
              },
            },
            Source: 'cc1@areness.co.in', 
            ConfigurationSetName: 'arenessconin', // Name of your SES configuration set
          };
    
          const sentEmailData = await ses.sendEmail(emailParams).promise();
          console.log("Email sent:", sentEmailData.MessageId);
          return true
        
    } catch (error) {
        console.log(error)
        return false
        
    }
}
