const express = require('express')
const stripe = require('stripe')('sk_test_your_stripe_secret_key')
const cors = require('cors')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.post('/create-payment-intent', async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 199, // 1.99$ için cent cinsinden
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
    })

    res.json({
      clientSecret: paymentIntent.client_secret
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/payment-status/:paymentIntentId', async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(
      req.params.paymentIntentId
    )

    res.json({
      status: paymentIntent.status,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.post('/send-results', async (req, res) => {
  try {
    const { email, score, totalQuestions, testId } = req.body

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'your-email@gmail.com',
        pass: 'your-app-password'
      }
    })

    const mailOptions = {
      from: 'your-email@gmail.com',
      to: email,
      subject: 'IQ Test Sonuçlarınız',
      html: `
        <h1>IQ Test Sonuçlarınız</h1>
        <p>Test ID: ${testId}</p>
        <p>Doğru Cevap Sayısı: ${score}</p>
        <p>Toplam Soru Sayısı: ${totalQuestions}</p>
        <p>Başarı Oranı: ${(score/totalQuestions*100).toFixed(2)}%</p>
        <p>Test Tarihi: ${new Date().toLocaleDateString('tr-TR')}</p>
        <p>Saygılarımızla,<br>IQ Tests Ekibi</p>
      `
    }

    await transporter.sendMail(mailOptions)
    res.json({ success: true })
  } catch (error) {
    console.error('E-posta gönderme hatası:', error)
    res.status(500).json({ error: 'E-posta gönderilemedi' })
  }
})

// Webhook endpoint'i (Stripe'dan gelen olayları dinlemek için)
app.post('/webhook', express.raw({type: 'application/json'}), async (req, res) => {
  const sig = req.headers['stripe-signature']
  const endpointSecret = 'YOUR_WEBHOOK_SECRET'

  let event

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret)
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`)
    return
  }

  // Ödeme başarılı olduğunda
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object
    console.log('Ödeme başarılı:', paymentIntent.id)
  }

  res.json({received: true})
})

app.post('/subscribe-newsletter', async (req, res) => {
  try {
    const { email } = req.body

    // E-posta gönderme işlemi
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'your-email@gmail.com',
        pass: 'your-app-password'
      }
    })

    const mailOptions = {
      from: 'your-email@gmail.com',
      to: email,
      subject: 'IQ Tests Bültenine Hoş Geldiniz!',
      html: `
        <h1>Hoş Geldiniz!</h1>
        <p>IQ Tests bültenimize başarıyla abone oldunuz.</p>
        <p>Yeni testler ve güncellemelerden ilk siz haberdar olacaksınız.</p>
        <p>Saygılarımızla,<br>IQ Tests Ekibi</p>
      `
    }

    await transporter.sendMail(mailOptions)
    res.json({ success: true })
  } catch (error) {
    console.error('E-posta gönderme hatası:', error)
    res.status(500).json({ error: 'E-posta gönderilemedi' })
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
}) 