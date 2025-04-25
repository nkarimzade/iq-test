const express = require('express')
const stripe = require('stripe')('YOUR_SECRET_KEY')
const cors = require('cors')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')

const app = express()

// Middleware
app.use(cors())
app.use(bodyParser.json())

// Ödeme işlemi için endpoint
app.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency, paymentMethod } = req.body

    // Ödeme niyeti oluştur
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Kuruş cinsinden
      currency: currency,
      payment_method_types: [paymentMethod],
      metadata: {
        testId: req.body.testId || 'unknown'
      }
    })

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    })
  } catch (error) {
    console.error('Ödeme hatası:', error)
    res.status(500).json({ error: error.message })
  }
})

// Ödeme durumunu kontrol et
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

// Başarılı ödeme sonrası e-posta gönderimi
app.post('/send-results', async (req, res) => {
  try {
    const { email, testId, score } = req.body

    // Burada e-posta gönderme işlemi yapılacak
    // Örnek: nodemailer kullanarak
    // const transporter = nodemailer.createTransport({...})
    // await transporter.sendMail({...})

    res.json({ success: true, message: 'E-posta gönderildi' })
  } catch (error) {
    res.status(500).json({ error: error.message })
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
    // Burada gerekli işlemleri yapabilirsiniz
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