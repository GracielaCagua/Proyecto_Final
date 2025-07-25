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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const bcrypt = require("bcrypt");
const mail_service_1 = require("../mail/mail.service");
const crypto = require("crypto");
let AuthService = class AuthService {
    constructor(usersRepository, jwtService, mailService) {
        this.usersRepository = usersRepository;
        this.jwtService = jwtService;
        this.mailService = mailService;
    }
    async register(registerDto) {
        const user = this.usersRepository.create(registerDto);
        await this.usersRepository.save(user);
        return this.generateToken(user);
    }
    async login(loginDto) {
        const user = await this.usersRepository.findOne({ where: { email: loginDto.email } });
        if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        }
        return this.generateToken(user);
    }
    generateToken(user) {
        const payload = { email: user.email, sub: user.id };
        return {
            accessToken: this.jwtService.sign(payload, {
                expiresIn: user.keepSignedIn ? '7d' : '1d',
            }),
        };
    }
    async requestPasswordReset(email) {
        const user = await this.usersRepository.findOneBy({ email });
        if (!user) {
            return;
        }
        const token = crypto.randomBytes(20).toString('hex');
        await this.mailService.sendResetPasswordEmail(user.email, token);
    }
    async findByEmail(email) {
        const user = await this.usersRepository.findOneBy({ email });
        if (!user) {
            throw new common_1.BadRequestException('Usuario no encontrado');
        }
        return user;
    }
    async resetPassword(email, newPassword) {
        const user = await this.usersRepository.findOneBy({ email });
        if (!user) {
            throw new common_1.BadRequestException('Usuario no encontrado');
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await this.usersRepository.update(user.id, {
            password: hashedPassword,
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService,
        mail_service_1.MailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map