package com.example.backend.controller

import com.example.backend.model.ApprovableBaseModel
import com.example.backend.model.PendingState
import com.example.backend.repository.ApprovableBaseRepository
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.server.ResponseStatusException
import javax.validation.Valid

abstract class ApprovableRestController<T : ApprovableBaseModel> : BaseRestController<T>() {
    abstract override val repository: ApprovableBaseRepository<T>

    /**
     * Get all approved entities.
     * @param pageable Pageable object specifying e.g. number of returned elements
     * @param qParams Not used, required by inheritance
     * @return Page containing all approved entities
     *
     * @throws ResponseStatusException If the user is not authorized to access this endpoint
     */
    @GetMapping
    override fun getAll(@RequestParam(required = false) qParams: Map<String, String>): ResponseEntity<Iterable<T>> {
        return ResponseEntity.ok(repository.findByPending(PendingState.APPROVED))
    }

    /**
     * Get all unapproved entities.
     * This endpoint should only be reachable from HR.
     * @param pageable Pageable object specifying e.g. number of returned elements
     * @param qParams Map of query parameters. Not used atm
     * @return Page containing all unapproved entities
     *
     * @throws ResponseStatusException If the user is not authorized to use this endpoint
     */
    @GetMapping("/unapproved")
    open fun getUnapproved(@RequestParam(required = false) qParams: Map<String, String>): ResponseEntity<Iterable<T>> {
        return ResponseEntity.ok(repository.findByPending(PendingState.UNAPPROVED))
    }

    @GetMapping("/to_edit")
    open fun getToEdit(@RequestParam(required = false) qParams: Map<String, String>): ResponseEntity<Iterable<T>> {
        return ResponseEntity.ok(repository.findByPending(PendingState.TO_EDIT))
    }

    /**
     * Save a new entity.
     * This function will set the approved attribute to true if the requesting user belongs to HR
     * By default, entities are unapproved, despite what the request specifies
     * @param obj Entity to save
     * @return Saved entity
     *
     * @throws ResponseStatusException If the user is not authorized to use this endpoint
     */
    @PostMapping
    override fun post(@RequestParam(required = false) @Valid @RequestBody obj: T): ResponseEntity<T> {
        obj.id = null
        obj.pending = PendingState.UNAPPROVED
        val result: T = repository.save(obj)
        return ResponseEntity(result, HttpStatus.CREATED)
    }

    /**
     * Approves an entity.
     * This endpoint should only be reachable by HR.
     * @param entityId ID of the entity to approve
     * @return Approved entity
     *
     * @throws ResponseStatusException If no entity with the given ID was found or it was already approved
     */
    @PutMapping("/approve/{entityId}")
    open fun approveEntity(@PathVariable("entityId") entityId: Long): ResponseEntity<T> {
        val optionalObj = repository.findById(entityId)
        if (optionalObj.isEmpty)
            throw ResponseStatusException(HttpStatus.NOT_FOUND, "No entity: $entityId found")

        val obj = optionalObj.get()
        if (obj.pending == PendingState.APPROVED)
            throw ResponseStatusException(HttpStatus.BAD_REQUEST, "Entity: $entityId is already approved")

        obj.pending = PendingState.APPROVED
        repository.save(obj)

        return ResponseEntity.ok(obj)
    }
}