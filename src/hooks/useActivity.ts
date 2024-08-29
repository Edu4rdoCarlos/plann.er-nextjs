
import { ApiActivity } from '@/app/services/activity'
import { useMutation, useQuery, useQueryClient } from 'react-query'

const QUERY_KEY = 'qkActivity'

const Create = () => {
  const queryClient = useQueryClient()

  return useMutation(ApiActivity.create, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY)
    }
  })
}

const Delete = () => {
  const queryClient = useQueryClient()

  return useMutation(ApiActivity.delete, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY)
    }
  })
}

const ListAll = () => {
  return useQuery([QUERY_KEY], () => ApiActivity.listAll())
}

const FindOne = (id: string) => {
  return useQuery([QUERY_KEY, id], () => ApiActivity.findOne(id))
}

const Update = () => {
  const queryClient = useQueryClient()

  return useMutation(ApiActivity.update, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY)
    }
  })
}

export const useActivity = {
    Create,
    Delete,
    Update,
    FindOne,
    ListAll,
}
