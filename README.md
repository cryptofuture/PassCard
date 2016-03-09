PassCard
================

######Android Password Card Generator Application

You can take your Password Card in any place you go. Application don't need extra permissions or internet access. And it runs locally.  

The idea is simple: generate a password card that has your password printed in the card IN PLAIN TEXT. Take the card with you, and you have access to passwords, for every account you have, and if an attacker get access to your card, you'll have time to change your password.

Application could be useful for old people, for people who need quite frequently change passwords. Beside that fact even printed Password Card glued to your monitor and shared in media, can be quite secure and will give you some time to change password in case of leak. Also you can invent you own scheme for reading letters on Password Card, where every letter means something else. You can check [Aaron's blog post](https://pthree.org/2010/09/21/password-cards/) about Password Cards for more information.

# Installation :
Install latest apk file from [F-Droid repository](https://f-droid.org/repository/browse/?fdfilter=Passcard&fdid=com.passcard ). Also F-Droid can handle application updating for you.


# How it works :
Web page with canvas image runs in WebView. So you basically can take assets folder from project and run passwordcard.html file in any modern browser. jsbn and jsbn2 libraries used for basic BigInteger implementation and RSA encryption. LICENSES-assets file contains assets files licensing.

# Donation :  
Bitcoin : 1N5czHaoSLukFSTq2ZJujaWGjkmBxv2dT9
# How it looks like :
![alt tag](https://raw.githubusercontent.com/cryptofuture/PassCard/master/passcard.png)


