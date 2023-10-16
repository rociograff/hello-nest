import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';
import { Breed } from 'src/breeds/entities/breed.entity';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private catsRepository: Repository<Cat>,

    @InjectRepository(Breed)
    private readonly breedsRepository: Repository<Breed>,
  ) { }

  async create(createCatDto: CreateCatDto) {
    const breed = await this.breedsRepository.findOneBy({ name: createCatDto.breed });

    if (!breed) {
      throw new BadRequestException('Breed not found');
    }

    return this.catsRepository.save({
      ...createCatDto,
      breed,
    });
    // const cat = this.catsRepository.create(createCatDto);
    // return this.catsRepository.save(cat);
    // return 'This action adds a new cat';
  }

  async findAll() {
    return await this.catsRepository.find();
    // return `This action returns all cats`;
  }

  async findOne(id: number) {
    return await this.catsRepository.findOneBy({ id });
    // return `This action returns a #${id} cat`;
  }

  async update(id: number, updateCatDto: UpdateCatDto) {
    return await this.catsRepository.update(id, updateCatDto);
    // return `This action updates a #${id} cat`;
  }

  async remove(id: number) {
    return await this.catsRepository.softDelete({ id }); //se le pasa el id
    // return this.catsRepository.softRemove({ id }); //se le pasa la instancia
    // return `This action removes a #${id} cat`;
  }
}
