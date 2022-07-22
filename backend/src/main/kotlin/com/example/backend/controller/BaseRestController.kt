package com.example.backend.controller

import com.example.backend.model.BaseModel
import com.example.backend.repository.BaseRepository
import org.springframework.http.HttpStatus.*
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.server.ResponseStatusException
import javax.validation.Valid

abstract class BaseRestController<T : BaseModel> {
    protected abstract val repository: BaseRepository<T>

    @GetMapping
    open fun getAll(@RequestParam(required = false) qParams: Map<String, String>): ResponseEntity<Iterable<T>> {
        val models = repository.findAll()
        return ResponseEntity.ok(models)
    }

    @PostMapping
    open fun post(@Valid @RequestBody obj: T): ResponseEntity<T> {
        obj.id = null
        val result: T = repository.save(obj)
        return ResponseEntity(result, CREATED)
    }

    @PutMapping(value = ["/{id}"])
    open fun put(@Valid @RequestBody obj: T, @PathVariable("id") id: Long): ResponseEntity<T> {
        if (obj.id != id)
            throw ResponseStatusException(BAD_REQUEST, "Entity ID and Path ID do not match")

        if (!repository.existsById(id))
            throw ResponseStatusException(NOT_FOUND, "ID not found")

        val result: T = repository.save(obj)
        return ResponseEntity.ok(result)
    }

    @GetMapping(value = ["/{id}"])
    open fun get(@PathVariable("id") id: Long): ResponseEntity<T> {
        val result = repository.findById(id)
        if (result.isEmpty)
            throw ResponseStatusException(NOT_FOUND)

        return ResponseEntity.ok(result.get())
    }

    @DeleteMapping(value = ["/{id}"])
    open fun delete(@PathVariable("id") id: Long): ResponseEntity<Any> {
        if (!repository.existsById(id))
            throw ResponseStatusException(NOT_FOUND)


        repository.deleteById(id)

        return ResponseEntity.status(NO_CONTENT).build()
    }
}