# QR payment system #

Implement a payment service, where every user has it's own digital wallet.
There are also the admins, who have privileges to generate money by the way described below.

## Functionality ##

- every transaction should be done with the help of qr-codes.
- user can:
  - generate qr-code to give it to another user in the system (smth like providing credentials for another user to transfer money to account with this credentials)
    - code may be dedicated to concrete user
    - code may contain amount of money to pay. Otherwise payer can set the amount of money hi wants to transfer by his own
  - scan codes and make a transaction
  - scan given by admin code to add money to his (users) account
- admin can:
  - do all, what user can
  - generate qr-codes for users to add money to theirs accounts
    - code can be personalized or not (can be used by any user)
    - code can be used only once by a single user
- codes should be signed to prevent unauthorized change
