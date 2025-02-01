package com.pawan.CRUDApp.repo;

import com.pawan.CRUDApp.model.Client;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ClientsRepo extends MongoRepository<Client, ObjectId> {
    Client findById(Long id);

    void deleteById(Long id);
}
