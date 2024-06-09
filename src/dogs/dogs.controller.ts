import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';

@Controller('dogs')
export class DogsController {
    private dogs = [];

    @Get()
    getAllDogs() {
        return this.dogs;
    }

    @Post()
    createDog(@Body() dog: { id: number, name: string, age: number }) {
        this.dogs.push(dog);
        return { statusCode: 201, message: 'New dog added!', dog};
    }

    @Get(':id')
    getDogId(@Param('id') id: string) {
        const numericId = parseInt(id, 10);
        const dog = this.dogs.find(d => d.id === numericId);
        if (!dog) {
            return { statusCode: 404, message: 'Dog not found...' };
        }
        return dog;
    }

    @Put(':id')
    updateDog(@Param('id') id: string, @Body() update: { name?: string, age?: number }) {
        const numericId = parseInt(id, 10);
        const dogIndex = this.dogs.findIndex(d => d.id === numericId);
        if (dogIndex === -1) {
            return { statusCode: 404, message: 'Dog not found...' };
        }
        const updatedDog = { ...this.dogs[dogIndex], ...update };
        this.dogs[dogIndex] = updatedDog;
        return { statusCode: 200, message: 'Dog updated successfully!', updatedDog};
    }

    @Delete(':id')
    deleteDog(@Param('id') id: string) {
        const numericId = parseInt(id, 10);
        const dogIndex = this.dogs.findIndex(d => d.id === numericId);
        if (dogIndex === -1) {
            return { statusCode: 404, message: 'Dog not found...'};
        }
        this.dogs.splice(dogIndex, 1);
        return { statusCode: 204, message: 'Dog deleted succesfully.' };
    }
}