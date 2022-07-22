package com.example.backend.controller

import com.example.backend.model.Meal
import com.example.backend.model.PendingState
import com.example.backend.model.Restaurant
import com.example.backend.repository.MealRepository
import com.example.backend.repository.RestaurantRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus.*
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.server.ResponseStatusException

@RestController
@RequestMapping("/restaurants")
class RestaurantController(override val repository: RestaurantRepository) :
        BaseRestController<Restaurant>() {

    @Autowired lateinit var mealRepository: MealRepository

    @GetMapping(value = ["/{id}/meals"])
    fun getMealsOfRestaurant(@PathVariable("id") id: Long): ResponseEntity<Iterable<Meal>> {
        val res = repository.findById(id)
        if (res.isEmpty) throw ResponseStatusException(NOT_FOUND)

        val results = mealRepository.findByRestaurantAndPending(id, PendingState.APPROVED)

        return ResponseEntity.ok(results)
    }
}
