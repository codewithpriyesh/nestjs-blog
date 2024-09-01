import { Injectable } from '@nestjs/common';
import { UserService } from 'src/users/provider/users.service';

@Injectable()
export class PostService {
  constructor(private readonly userService: UserService) {}
}
