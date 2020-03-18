import Mail from '../../lib/Mail';

class CanceledDeliveryMail {
  get key() {
    return 'CanceledDeliveryMail';
  }

  async handle({ data }) {
    const { delivery } = data;

    await Mail.sendMail({
      to: `${delivery.deliveryman.name} <${delivery.deliveryman.email}>`,
      subject: 'One of your deliveries was canceled',
      template: 'canceleddelivery',
      context: {
        recipient: delivery.recipient.name,
        deliveryman: delivery.deliveryman.name,
        product: delivery.product,
        problems: delivery.problem,
      },
    });
  }
}

export default new CanceledDeliveryMail();
