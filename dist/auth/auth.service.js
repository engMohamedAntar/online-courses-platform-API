"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../user/user.entity");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcrypt"));
const userResponse_dto_1 = require("../user/dto/userResponse.dto");
const config_1 = require("@nestjs/config");
const user_service_1 = require("../user/user.service");
let AuthService = class AuthService {
    userRepo;
    jwtService;
    configService;
    userService;
    constructor(userRepo, jwtService, configService, userService) {
        this.userRepo = userRepo;
        this.jwtService = jwtService;
        this.configService = configService;
        this.userService = userService;
    }
    async register(body) {
        const hash = await bcrypt.hash(body.password, 10);
        const user = this.userRepo.create({
            ...body,
            password: hash,
        });
        await this.userRepo.save(user);
        const token = this.jwtService.sign({ sub: user.id, email: user.email });
        return new userResponse_dto_1.UserResponseDto(user, token);
    }
    async generateTokens(user) {
        const payload = { sub: user.id, email: user.email };
        const accessToken = await this.jwtService.signAsync(payload);
        const refreshToken = await this.jwtService.signAsync(payload, {
            secret: this.configService.get('REFRESH_JWT_SECRET'),
            expiresIn: this.configService.get('REFRESH_JWT_EXPIRE_IN'),
        });
        return {
            accessToken,
            refreshToken,
        };
    }
    async login(user) {
        const { accessToken, refreshToken } = await this.generateTokens(user);
        return {
            id: user.id,
            accessToken,
            refreshToken,
        };
    }
    refreshToken(user) {
        const payload = { sub: user.id, email: user.email };
        const token = this.jwtService.sign(payload);
        return { accessToken: token };
    }
    async validateGoogleUser(googleUser) {
        const user = await this.userService.findByEmail(googleUser.email);
        if (user) {
            return user;
        }
        return await this.userService.createUser(googleUser);
    }
    async validateUser(email, pass) {
        const user = await this.userService.findByEmail(email);
        if (!user)
            throw new common_1.UnauthorizedException('User not found!');
        const isPasswordMatch = await bcrypt.compare(pass, user.password);
        if (!isPasswordMatch)
            throw new common_1.UnauthorizedException('Invalid credentials');
        const { password, ...data } = user;
        return data;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService,
        config_1.ConfigService,
        user_service_1.UserService])
], AuthService);
//# sourceMappingURL=auth.service.js.map