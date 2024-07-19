const payWithMpesa = async ({ req, res, log, error }) => {
  res.json({ success: true, messege: 'pay with mpesa' });
};
export default payWithMpesa;
