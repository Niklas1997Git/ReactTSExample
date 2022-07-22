package com.example.backend.model

import org.springframework.data.jpa.domain.support.AuditingEntityListener
import org.springframework.data.util.ProxyUtils
import javax.persistence.EntityListeners
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType.IDENTITY
import javax.persistence.Id
import javax.persistence.MappedSuperclass

@MappedSuperclass
@EntityListeners(AuditingEntityListener::class)
abstract class BaseModel {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    var id: Long? = null

    override fun equals(other: Any?): Boolean {
        other ?: return false
        if (this === other) return true
        if (javaClass != ProxyUtils.getUserClass(other)) return false
        other as BaseModel
        return if (null == this.id) false else this.id == other.id
    }

    override fun hashCode(): Int {
        val hashId: Int = id?.toInt() ?: 7
        return (hashId xor (hashId ushr 32))
    }

    override fun toString() = "Entity of type ${this.javaClass.name} with id: $id"
}