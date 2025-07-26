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
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const path = require("path");
const fs = require("fs");
const handlebars = require("handlebars");
const auth_service_1 = require("../auth/auth.service");
const mail_module_1 = require("./mail.module");
let MailService = class MailService {
    constructor(configService, usersService, transporter) {
        this.configService = configService;
        this.usersService = usersService;
        this.transporter = transporter;
    }
    async sendResetPasswordEmail(email, resetUrl) {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            return;
        }
        const templatePath = path.join(__dirname, 'templates', 'reset-password.template.hbs');
        const templateSource = fs.readFileSync(templatePath, 'utf8');
        const template = handlebars.compile(templateSource);
        const html = template({
            name: user.name || 'Usuario',
            resetUrl,
            expirationHours: this.configService.get('RESET_PASSWORD_EXPIRATION_HOURS'),
        });
        await this.transporter.sendMail({
            from: `"${this.configService.get('EMAIL_FROM_NAME')}" <${this.configService.get('EMAIL_FROM')}>`,
            to: email,
            subject: 'Restablecimiento de contraseña',
            html,
        });
    }
};
exports.MailService = MailService;
exports.MailService = MailService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Inject)(mail_module_1.MAIL_TRANSPORTER)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        auth_service_1.AuthService, Object])
], MailService);
//# sourceMappingURL=mail.service.js.map