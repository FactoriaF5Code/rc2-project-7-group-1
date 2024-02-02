package group1.backend.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import group1.backend.persistence.Item;
import group1.backend.persistence.ItemRepository;


@RestController
@CrossOrigin(origins = "http://localhost:5173", methods = { RequestMethod.GET, RequestMethod.PUT })

public class ItemController {

    private ItemRepository repository;
    private DeleteItem deleteItem;

    public ItemController(@Autowired ItemRepository repository, @Autowired DeleteItem deleteItem) {
        this.repository = repository;
        this.deleteItem = deleteItem;
    }

    @GetMapping("/items")
    public List<ItemResponse> showItems() {
        List<ItemResponse> items = new ArrayList<ItemResponse>();
        List<Item> itemsInDatabase = repository.findAll();
        for (Item item : itemsInDatabase) {
            items.add(new ItemResponse(item.getId(), item.getTitle(), item.getUrl()));
        }
        return items;
    }

    @PostMapping("/items")
    public ItemResponse createItem(@RequestBody ItemRequest request) {
        Item item = new Item(request.getId(), request.getTitle(), request.getUrl());
        Item savedItem = repository.save(item);
        return new ItemResponse(savedItem.getId(), savedItem.getTitle(), savedItem.getUrl());
    }

    @DeleteMapping("items/{id}")
    public String deleteById(@PathVariable("id") Long id) {
        boolean ok = this.deleteItem.deleteItem(id);
        if (ok) {
            return "User with id " + id + " deleted correctly.";
        } else {
            return "Error, the user with " + id + " was not found";
        }
    }

    @PutMapping("items/{id}")
    public ResponseEntity<ItemResponse> updateItem(@PathVariable Long id, @RequestBody ItemRequest updatedItem) {
        Optional<Item> optionalItem = repository.findById(id);
        if (optionalItem.isPresent()) {
            Item existingItem = optionalItem.get();
            existingItem.setTitle(updatedItem.getTitle());
            existingItem.setUrl(updatedItem.getUrl());
            Item updatedItemEntity = repository.save(existingItem);
            ItemResponse itemResponse = new ItemResponse(updatedItemEntity.getId(), updatedItemEntity.getTitle(),
                    updatedItemEntity.getUrl());
            return ResponseEntity.ok(itemResponse);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/items/{id}")
    public ResponseEntity<ItemResponse> getItemById(@PathVariable Long id) {
        Optional<Item> optionalItem = repository.findById(id);
        if (optionalItem.isPresent()) {
            Item item = optionalItem.get();
            ItemResponse itemResponse = new ItemResponse(item.getId(), item.getTitle(), item.getUrl());
            return ResponseEntity.ok(itemResponse);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
