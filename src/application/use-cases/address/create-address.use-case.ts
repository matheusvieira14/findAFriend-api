import { CreateAddressUseCaseRequest, CreateAddressUseCaseResponse } from "@/application/types/address.type";
import { AddressRepository } from "@/infra/database/repositories/address-repository";
import { CreateAddressException } from "./errors/address-already-exists-error";

export class CreateAddressUseCase {
    constructor(private addressRepository: AddressRepository) { }

    public execute = async (body: CreateAddressUseCaseRequest): Promise<CreateAddressUseCaseResponse> => {
        try {
            const { city, country, lat, lng, neighbourhood, postalCode, province, uf } = body;

            const address = await this.addressRepository.create({
                city,
                country,
                lat,
                lng,
                neighbourhood,
                postalCode,
                province,
                uf,
            });

            return { address };

        } catch (err) {

            throw new CreateAddressException((err as Error).message);
        }
    };
}
