const db = require('../Models');
const AgentMunicipalite  = db.AgentMunicipalite;
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const saltRounds = 10;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const createAgent = async (req, res) => {
  try {
    const {
      nom_municipalite,
      prenom_municipalite,
      email_municipalite,
      password_municipalite,
      telephone_municipalite,
      fonction_municipalite,
      privilege_municipalite,
      matricule_municipalite,
      adresse_municipalite,
    } = req.body;

    const hashedPassword = await bcrypt.hash(password_municipalite, saltRounds);

    const agent = await AgentMunicipalite.create(req.body);

    const verificationLink = `http://${req.headers.host}/verify-email/${email_municipalite}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email_municipalite,
      subject: 'Verify Your Email',
      text: `Please click the following link to verify your email address: ${verificationLink}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    res.status(201).json({ message: 'User created successfully!' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error creating user.' });
  }
};

/*const createAgent = async (req, res) => {
  const {
    nom_municipalite,
    prenom_municipalite,
    email_municipalite,
    password_municipalite,
    telephone_municipalite,
    fonction_municipalite,
    privilege_municipalite,
    matricule_municipalite,
    adresse_municipalite,
  } = req.body;

  try {
    const agent = await AgentMunicipalite.create(req.body);

    const changePasswordLink = `http://localhost:8080/changement-mot-de-passe/${email_municipalite}`;

    async function sendEmail() {
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'yahyaservices9@gmail.com',
          pass: 'yahyaservices9',
        },
      });
      const mailOptions = {
        from: 'yahyaservices9@gmail.com',
        to: email_municipalite,
        subject: 'طلب إنضمام',
        html: `
          <h1>طلب إنضمام</h1>
          <p>تعتزم بلدية غار الملح بدعوتك للانظمام الى متصفح الواب الفلاني كعون بلدي برتبة   </p>
          <p>${fonction_municipalite}</p>
          <p>اضغط هنا للمزيد من المعلومات</p>
          <a href="${changePasswordLink}"><button>المتابعة</button></a>
        `,
      };
      const info = await transporter.sendMail(mailOptions);

      console.log('E-mail envoyé: %s', info.messageId);
    }

    sendEmail().catch(console.error);
    res.status(201).json(agent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
*/
const getAgentById = async (req, res) => {
  try {
    const agent = await AgentMunicipalite.findByPk(req.params.id);
    if (!agent) {
      return res.status(404).json({ message: 'Agent not found' });
    }
    res.json(agent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateAgentById = async (req, res) => {
  try {
    const [rowsUpdated, [updatedAgent]] = await AgentMunicipalite.update(req.body, {
      where: { id_municipalite: req.params.id },
      returning: true,
    });
    if (rowsUpdated !== 1) {
      return res.status(404).json({ message: 'Agent not found' });
    }
    res.json(updatedAgent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

 const updateAgentByEmail = async (req, res) => {
  try {
    const email_municipalite = req.params.email;
    const etat_municipalite = true;
    const [rowsUpdated] = await AgentMunicipalite.update({ etat_municipalite }, {
      where: { email_municipalite },
    });
    if (rowsUpdated !== 1) {
      return res.status(404).json({ message: 'Agent not found' });
    }
    res.send('oui');
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}; 

const deleteAgentById = async (req, res) => {
  try {
    const rowsDeleted = await AgentMunicipalite.destroy({
      where: { id_municipalite: req.params.id },
    });
    if (rowsDeleted !== 1) {
      return res.status(404).json({ message: 'Agent not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getAgents = async (req, res) => {
  try {
    const agents = await AgentMunicipalite.findAll();
    res.json(agents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const changerMotDePasse = async (req, res) => {
  try {
    const email_municipalite = req.params.email;
    res.send(`
      <form action="/UpdateNewAgentByEmail/${email_municipalite}" method="POST">
        <button type="submit">Accepter</button>
      </form>
      <form action="/DeleteNewAgentByEmail/${email_municipalite}" method="POST">
      <button type="submit">Rejeter</button>
    </form>
    `);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
module.exports = {
  createAgent,
  getAgentById,
  updateAgentById,
  updateAgentByEmail,
  deleteAgentById,
  getAgents,
  changerMotDePasse,
};
