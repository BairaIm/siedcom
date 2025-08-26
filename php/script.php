<?php
    // Получаем данные из полей ввода
    $name = $_POST['name'];
    $email = $_POST['email'];
    $comment = $_POST['comment'];
    $to = 'example@admin.com';
    $header = 'Комментарий от пользователя';
    // Собираем все данные в письмо
    $message = "Имя пользователя: $name \nЭлектронная почта: $email \nКомментарий: $comment";
    // Отправляем письмо
    $send = mail($to, $header, $message, "Content-type:text/plain; charset = UTF-8\r\nFrom:$email");
