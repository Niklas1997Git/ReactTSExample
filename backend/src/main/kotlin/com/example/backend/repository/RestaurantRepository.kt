package com.example.backend.repository

import com.example.backend.model.Restaurant
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface RestaurantRepository : BaseRepository<Restaurant>{
    fun findByName(name: String): Optional<Restaurant>
}