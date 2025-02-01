package com.pawan.CRUDApp.controller;

import com.pawan.CRUDApp.model.Client;
import com.pawan.CRUDApp.model.User;
import com.pawan.CRUDApp.repo.ClientsRepo;
import com.pawan.CRUDApp.repo.UserRepo;
import com.pawan.CRUDApp.service.JwtService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
public class ClientsController {

    @Autowired
    private ClientsRepo repo;

    @Autowired
    private JwtService jwtService;

    @Autowired
    AuthenticationManager authenticationManager;

    BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder(12);

    @Autowired
    private UserRepo userRepo;

    @PostMapping("/client")
    public ResponseEntity<Void> addClient(@RequestBody Client client){
        repo.save(client);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/clients")
    public List<Client> getClients(){
        return repo.findAll();
    }

    @GetMapping("/client/{id}")
    public ResponseEntity<Client> getClient(@PathVariable Long id){
        Optional<Client> client = Optional.ofNullable(repo.findById(id));

        if (client.isPresent()) {
            return ResponseEntity.ok(client.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/client/{id}")
    public ResponseEntity<Client> updateClient(@RequestBody Client client, @PathVariable Long id){
        Optional<Client> existingClientOpt = Optional.ofNullable(repo.findById(id));

        if (existingClientOpt.isPresent()) {
            Client existingClient = existingClientOpt.get();
            existingClient.setName(client.getName());
            existingClient.setEmail(client.getEmail());
            repo.save(existingClient);
            return ResponseEntity.ok(existingClient);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/client/{id}")
    public ResponseEntity<Void> deleteClient(@PathVariable Long id){
        Optional<Client> clientOpt = Optional.ofNullable(repo.findById(id));

        if (clientOpt.isPresent()) {
            repo.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/register")
    public ResponseEntity<Void> register(@RequestBody User user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepo.save(user);
        return ResponseEntity.ok().build();
    }


    @PostMapping("/login")
    public String login(@RequestBody User user){
        System.out.println("Helloooooo " + user );
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
        if(authentication.isAuthenticated())
            return jwtService.generateToken(user.getUsername());
        else return "Fail";
    }
}
