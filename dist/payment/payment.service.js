"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const payment_entity_1 = require("./payment.entity");
const enrollment_service_1 = require("../enrollment/enrollment.service");
const stripe = require('stripe')(process.env.STRIPE_SECRET);
let PaymentService = class PaymentService {
    paymentRepo;
    enrollmentService;
    constructor(paymentRepo, enrollmentService) {
        this.paymentRepo = paymentRepo;
        this.enrollmentService = enrollmentService;
    }
    async createPayment(user, course) {
        const payment = this.paymentRepo.create({
            user,
            course,
            amount: course.price,
            currency: 'EGP',
            provider: payment_entity_1.PaymentProvider.STRIPE,
            status: payment_entity_1.PaymentStatus.PENDING,
        });
        return await this.paymentRepo.save(payment);
    }
    async createSession(paymentId, user, course) {
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: 'egp',
                        product_data: { name: course.title },
                        unit_amount: course.price * 100,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `https://buddy-epinions-careers-realize.trycloudflare.com/payment/success`,
            cancel_url: `https://buddy-epinions-careers-realize.trycloudflare.com/payment/cancel`,
            client_reference_id: paymentId.toString(),
            customer_email: user.email,
        });
        return session;
    }
    async handleWebhook(req) {
        const sig = req.headers['stripe-signature'];
        let event;
        try {
            event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
        }
        catch (err) {
            throw new Error(`Stripe Error: ${err}`);
        }
        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;
            const paymentId = Number(session.client_reference_id);
            const payment = await this.paymentRepo.findOne({
                where: { id: paymentId },
                relations: ['user', 'course'],
            });
            if (!payment)
                throw new common_1.NotFoundException('Payment not found');
            payment.status = payment_entity_1.PaymentStatus.SUCCESS;
            await this.paymentRepo.save(payment);
            await this.enrollmentService.createEnrollmentAfterPayment(payment.user, payment.course);
        }
        return { received: true };
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(payment_entity_1.Payment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        enrollment_service_1.EnrollmentService])
], PaymentService);
//# sourceMappingURL=payment.service.js.map