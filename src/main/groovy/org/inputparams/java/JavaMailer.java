package org.inputparams.java;


import java.util.Properties;
import java.util.ResourceBundle;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class JavaMailer
{

  public static void main(String[] args) throws Exception  {

    JavaMailer jm = new JavaMailer();





    jm.sendMail("pepcentric@gmail.com", "tatagroup" , "inspiresnehal@gmail.com", "TITLE", "TEXT");




  }
  public void sendMail(String from, String password, String to, String subject, String body) throws Exception {

    String host = "smtp.gmail.com";
    Properties props = System.getProperties();
    props.put("mail.smtp.starttls.enable",true);
    /* mail.smtp.ssl.trust is needed in script to avoid error "Could not convert socket to TLS"  */
    props.setProperty("mail.smtp.ssl.trust", host);
    props.put("mail.smtp.auth", true);
    props.put("mail.smtp.host", host);
    props.put("mail.smtp.user", from);
    props.put("mail.smtp.password", password);
    props.put("mail.smtp.port", "587");

    Session session = Session.getDefaultInstance(props, null);
    MimeMessage message = new MimeMessage(session);
    message.setFrom(new InternetAddress(from));

    InternetAddress toAddress = new InternetAddress(to);

    message.addRecipient(Message.RecipientType.TO, toAddress);

    message.setSubject(subject);
    message.setText(body);

    Transport transport = session.getTransport("smtp");

    transport.connect(host, from, password);

    transport.sendMessage(message, message.getAllRecipients());
    transport.close();

  }
}