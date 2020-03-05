INSERT INTO `qr_payment_system_db`.`users`
VALUES ('1934fa34-dce8-4dd0-8b0f-a8304c548df2', 'Alice', 'Smith'),
       ('4111bebf-a7ac-4d9f-ab2a-64d5514072fe', 'Bob', 'Smith');

INSERT INTO `qr_payment_system_db`.`money_accounts`
VALUES (
    'f3dbc203-61c3-49cb-8c69-58ffa416909f',
    '1934fa34-dce8-4dd0-8b0f-a8304c548df2',
    'Alices first money account'
),(
    'e2d85928-f721-412d-89b7-abfa6312024c',
    '1934fa34-dce8-4dd0-8b0f-a8304c548df2',
    'Alices second money account'
),(
    '3912c37c-13f0-4a42-9317-461fd888ebee',
    '1934fa34-dce8-4dd0-8b0f-a8304c548df2',
    'Alices third money account'        
),(
    '444315d7-e99c-474d-b48f-aaa2252efaeb',
    '4111bebf-a7ac-4d9f-ab2a-64d5514072fe',
    'Bobs first money account'
),(
    '70b74517-f6ff-4db7-a1a3-c36b6b174387',
    '4111bebf-a7ac-4d9f-ab2a-64d5514072fe',
    'Bobs second money account'
);

INSERT INTO `qr_payment_system_db`.`transactions`
VALUE (
    '0c79f420-72d6-4036-bb57-accad4c4c4c2',
    NULL,
    'f3dbc203-61c3-49cb-8c69-58ffa416909f',
    10000,
    '2000-01-01 22:00:00'
),(
    '39b3018c-e68f-4296-bd01-4af3a4687fd7',
    NULL,
    '444315d7-e99c-474d-b48f-aaa2252efaeb',
    20000,
    '2001-01-01 01:00:00'
),(
    '07d2d37c-9c10-4a01-8508-5c075351f1dc',
    'f3dbc203-61c3-49cb-8c69-58ffa416909f',
    '444315d7-e99c-474d-b48f-aaa2252efaeb',
    500,
    '2003-03-02 10:55:19'
);