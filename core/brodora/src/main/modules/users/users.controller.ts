import {
	Controller,
	Get,
	Inject,
	NotFoundException,
	Param,
	ParseIntPipe,
} from "@nestjs/common";
import type { UserRow } from "../../../shared/api/users.api";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
	constructor(@Inject(UsersService) private readonly users: UsersService) {}

	@Get(":id")
	async getById(@Param("id", ParseIntPipe) id: number): Promise<UserRow> {
		const row = await this.users.getById(id);
		if (!row) {
			throw new NotFoundException(`User ${id} not found`);
		}
		return row;
	}
}
