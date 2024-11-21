using QCC.Web.Models.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Web;

namespace QCC.Web.BusinessLogic
{
    public class SendEmail
    {
        public void SendMail(EmailBodyRequest emailBodyRequest)
        {
            // Credentials
            var credentials = new NetworkCredential("testinfot2@gmail.com", "Google1@#4");
            // Mail message
            var mail = new MailMessage()
            {
                From = new MailAddress("testinfot2@gmail.com"),
                Subject = emailBodyRequest.subject,
                Body = emailBodyRequest.emailBody
            };
            mail.To.Add(new MailAddress(emailBodyRequest.email));
            // Smtp client
            var client = new SmtpClient()
            {
                Port = 587,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Host = "smtp.gmail.com",
                EnableSsl = true,
                Credentials = credentials
            };
            // Send it...         
            client.Send(mail);
        }
    }
}