package group1.backend.controllers;

import org.springframework.stereotype.Service;

import group1.backend.persistence.ItemRepository;

@Service
public class DeleteItem {

    private ItemRepository itemRepository;

    public DeleteItem(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    public boolean deleteItem(Long id) {
        try {
            itemRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
