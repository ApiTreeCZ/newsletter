<p align="center">
<a href="https://github.com/ApiTreeCZ">
<img alt="ApiTree s.r.o." src="https://www.apitree.cz/static/images/logo-header.svg" width="120" />
<br>
ApiTree
</a>
</p>
<h1 align="center">🎄 Newsletter 🎄</h1>

<p align="center">
<a href="https://github.com/ApiTreeCZ/newsletter/actions/workflows/build.yml">
<img alt="Build" src="https://github.com/ApiTreeCZ/newsletter/actions/workflows/build.yml/badge.svg">
</a>
<a href="https://github.com/ApiTreeCZ/newsletter/actions/workflows/qa.yml">
<img alt="QA" src="https://github.com/ApiTreeCZ/newsletter/actions/workflows/qa.yml/badge.svg">
</a>
</p>

<p align="center">
Christmas newsletter built with <a href="https://github.com/forwardemail/email-templates"><code>email-templates</code></a>, made with ❤️
</p>

<p align="center">
<img alt="Merry Chrismtmas" src="https://64.media.tumblr.com/6f55d992b3a13b4d21bc6b3c46e34ea8/tumblr_mfnx0mH0o01qjtajso1_500.gif">
</p>

## 👀 Preview

The preview is available at [https://apitreecz.github.io/newsletter/](https://apitreecz.github.io/newsletter/).

## 💾 Installation

```bash
nvm use
yarn install
```

## ⚙️ Configuration

Create `.env` from `.env.example`

- `DRY_RUN` = `1` to run without actually sending, `0` to run normally
- `EMAIL_FROM` = email sender in `Name <user@domain.tld>` format
- `EMAIL_TO` = comma-separated list of newsletter recipient email addresses
- `SEND` = `1` to send via SMTP server, `0` to render preview in browser
- `SMTP_PASSWORD` = password to access the SMTP server
- `SMTP_SERVER` = the SMTP server address
- `SMTP_USER` = username to access the SMTP server

## 👨‍💻 Usage

### 📦 Build

```bash
yarn build
```

### ✉️ Send

```bash
yarn send
```

To prevent the newsletter being sent multiple times to the same recipient a `sent.json` will be created. This will
contain addresses and dates of sent emails that will be checked if `send` command is used again.

### 📄 Render

You can also render the newsletter into an HTML file. This will not send anything regardless the `.env` config.

```bash
yarn render
```
