package com.example.backend

import org.springframework.beans.BeansException
import org.springframework.context.ApplicationContext

import org.springframework.context.ApplicationContextAware
import org.springframework.stereotype.Component


@Component
class SpringContext : ApplicationContextAware {
    @Throws(BeansException::class)
    override fun setApplicationContext(context: ApplicationContext) {
        // store ApplicationContext reference to access required beans later on
        Companion.context = context
    }

    companion object {
        private var context: ApplicationContext? = null

        /**
         * Returns the Spring managed bean instance of the given class type if it exists.
         * Returns null otherwise.
         * @param beanClass
         * @return
         */
        fun <T : Any?> getBean(beanClass: Class<T>): T? {
            return context?.getBean(beanClass)
        }
    }
}