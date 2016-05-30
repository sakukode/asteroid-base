import { Meteor } from 'meteor/meteor';
import '../imports/api';
import '../imports/server';

Meteor.startup(() => {
  // code to run on server at startup
  //process.env.MAIL_URL = "smtp://postmaster%40postmaster@sandboxac27a85b706d45578ca2c8f7302fa3ed.mailgun.org:hinata88@smtp.mailgun.org:465";
});
