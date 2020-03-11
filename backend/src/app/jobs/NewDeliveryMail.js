import Mail from '../../lib/Mail';

class NewDeliveryMail {
  get key() {
    return 'NewDeliveryMail';
  }

  async handle({ data }) {
    const { delivery, recipient, deliveryman } = data;

    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'You have a new delivery',
      template: 'newdelivery',
      context: {
        recipient: recipient.name,
        deliveryman: deliveryman.name,
        product: delivery.product,
      },
    });
  }
}

export default new NewDeliveryMail();
