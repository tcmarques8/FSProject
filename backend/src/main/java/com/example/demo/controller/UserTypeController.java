package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.UserType;
import com.example.demo.services.UserService;

@PropertySource("classpath:application.properties")
@RestController
@RequestMapping("api")
@CrossOrigin(origins = "http://localhost:4200")
public class UserTypeController {

	@Autowired
	private UserService userService;

	@PostMapping("/type")
	public void addUserType(@RequestBody UserType userType) {
		userService.createUserType(userType);
	}

	@GetMapping("/type")
	public @ResponseBody Iterable<UserType> getAllTypes() {
		return userService.findAllTypes();
	}

	@GetMapping("/type/{typeId}")
	public ResponseEntity<UserType> getTypeById(@PathVariable int typeId) {

		UserType userType = userService.findTypeById(typeId);
		if (userType != null) {
			return ResponseEntity.ok(userType);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	// update existing usertype
	@PutMapping("/type")
	public UserType updateEmployee(@RequestBody UserType userType) {
		return userService.updateUserType(userType);
	}

	// delete usertype
	@DeleteMapping("/type/{userTypeId}")
	public ResponseEntity deleteUserType(@PathVariable int userTypeId) {
		UserType userType = userService.deleteUserType(userTypeId);

		if (userType != null) {
			return ResponseEntity.ok(userType);
		} else {
			return ResponseEntity.notFound().build();
		}
	}
}
