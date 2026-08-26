exports.paymentSuccessEmail = (name, amount, orderId, paymentId) => {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Payment Received</title>
</head>
<body style="background-color: #f4f4f4; font-family: Arial, sans-serif; padding: 20px;">
  <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
    <div style="background-color: #1a1a2e; padding: 20px; text-align: center;">
      <h1 style="color: #ffd60a; margin: 0;">StudyNotion</h1>
    </div>
    <div style="padding: 30px;">
      <h2 style="color: #1a1a2e;">Payment Received</h2>
      <p>Dear ${name},</p>
      <p>We have successfully received your payment. Here are the details:</p>
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Amount Paid</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">Rs. ${amount}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Order ID</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${orderId}</td>
        </tr>
        <tr>
          <td style="padding: 8px;"><strong>Payment ID</strong></td>
          <td style="padding: 8px;">${paymentId}</td>
        </tr>
      </table>
      <p>Thank you for choosing StudyNotion. Happy learning!</p>
      <p>Best regards,<br/>Team StudyNotion</p>
    </div>
  </div>
</body>
</html>`
}
