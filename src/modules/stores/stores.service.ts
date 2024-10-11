import { Injectable } from '@nestjs/common';
import { Store } from 'src/database';
import { StoresRepository } from './stores.repository';
import { ErrorHelper } from 'src/utils';

@Injectable()
export class StoresService {
  constructor(private storesRepository: StoresRepository) {}

  async approve(id: number): Promise<Store> {
    const store = await this.storesRepository.findOne({ where: [{ id }] });
    if (!store) {
      ErrorHelper.NotFoundException('store not found');
    }

    // toggle the isApproved status
    const newStatus = !store.isApproved;
    await this.storesRepository.update(
      { isApproved: newStatus },
      { where: [{ id }] },
    );

    return await this.storesRepository.findOne({
      where: [{ id }],
      attributes: { exclude: ['password'] },
    });
  }
}
