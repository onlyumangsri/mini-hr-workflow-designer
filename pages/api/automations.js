// pages/api/automations.js
export default function handler(req, res) {
  // Example list of automated actions available
  res.status(200).json([
    { id: 'send_email', name: 'Send Email' },
    { id: 'notify_manager', name: 'Notify Manager' },
    { id: 'update_record', name: 'Update Employee Record' }
  ]);
}
