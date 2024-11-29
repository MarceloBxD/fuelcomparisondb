const express = require('express');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

app.post('/fuel-check', async (req, res) => {
  try {
    const { gasoline, ethanol } = req.body;

    if (!gasoline || !ethanol) {
      return res.status(400).json({ error: 'Gasoline and ethanol prices are required' });
    }

    const recommendation =
      ethanol / gasoline <= 0.7 ? 'Vai de Etanol' : 'Vai de Gasolina';

    const newFuelCheck = await prisma.fuelCheck.create({
      data: {
        gasoline,
        ethanol,
      },
    });

    return res.status(201).json({
      message: `${recommendation}`,
      data: {
        ...newFuelCheck,
        recommendation,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/fuel-check', async (req, res) => {
  try {
    const fuelChecks = await prisma.fuelCheck.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return res.status(200).json(fuelChecks);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/fuel-check/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const fuelCheck = await prisma.fuelCheck.findUnique({
      where: { id: parseInt(id) },
    });

    if (!fuelCheck) {
      return res.status(404).json({ error: 'Fuel check not found' });
    }

    return res.status(200).json(fuelCheck);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = process.env.APP_PORT || 3333;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
