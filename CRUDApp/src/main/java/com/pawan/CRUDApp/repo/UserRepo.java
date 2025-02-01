package com.pawan.CRUDApp.repo;

import com.pawan.CRUDApp.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends MongoRepository<User, String> {

    User findByUsername(String username);
}
