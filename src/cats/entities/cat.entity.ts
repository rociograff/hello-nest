import { Column, Entity, DeleteDateColumn, ManyToOne } from "typeorm";
import { Breed } from "src/breeds/entities/breed.entity";

@Entity()
export class Cat {
    @Column({ primary: true, generated: true })
    id: number;

    @Column()
    name: string;

    @Column()
    age: number;

    // @Column()
    // breed: string;

    @ManyToOne(() => Breed, (breed) => breed.id, {
        // cascade: true,
        eager: true, // para que traiga las razas al hacer un findOne
    })
    breed: Breed;

    @DeleteDateColumn()
    deletedAt: Date;
}
