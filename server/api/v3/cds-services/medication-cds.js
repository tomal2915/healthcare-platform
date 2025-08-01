// api/v3/cds-services/medication-cds.js
const { evaluateCDSRules } = require('../../../services/cds/rule-engine');

module.exports = {
  id: 'medication-interaction-check',
  hook: 'medication-prescribe',
  title: 'Medication Interaction Checker',
  description: 'Checks for potential drug-drug interactions',
  prefetch: {
    patient: 'Patient/{{context.patientId}}',
    medications: 'MedicationRequest?patient={{context.patientId}}&status=active'
  },
  handler: async (req, res) => {
    const { context, prefetch } = req.body;
    const results = await evaluateCDSRules(context, prefetch);
    res.json(results);
  }
};