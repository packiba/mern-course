import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {Loader} from '../components/Loader'
import {LinksList} from '../components/LinksList'

export const LinksPage = () => {
  const [links, setLinks] = useState([])
  const {loading, request} = useHttp()
  const {token} = useContext(AuthContext)

  const fetchLinks = useCallback(async () => {
    try {
      console.log('trying...')
      const fetched = await request('/api/link', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      console.log('fetched', fetched)
      setLinks(fetched)
    } catch (e) {}
  }, [token, request])

  useEffect(() => {
    console.log('try to fetchLinks')
    fetchLinks()
  }, [fetchLinks])

  if (loading) {
    return <Loader/>
  }

  return (
    <>
      {!loading && <LinksList links={links} />}
    </>
  )
}