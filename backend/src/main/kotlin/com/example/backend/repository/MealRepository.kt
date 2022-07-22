package com.example.backend.repository

import com.example.backend.model.Meal
import com.example.backend.model.PendingState
import org.springframework.stereotype.Repository

@Repository
interface MealRepository : ApprovableBaseRepository<Meal> {
    fun findByRestaurant(id: Long): Iterable<Meal>
    fun findByRestaurantAndPending(id: Long, pendingState: PendingState): Iterable<Meal>
}
