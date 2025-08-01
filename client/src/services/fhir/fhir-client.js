// services/fhir/fhir-client.js
import { createFhirClient } from '../../lib/fhir/fhir-client';

export const FhirService = {
  getPatient: async (patientId) => {
    const client = await createFhirClient();
    return client.read({ resourceType: 'Patient', id: patientId });
  },
  // Add more FHIR operations
};