import TodosForm from "./TodosForm"
import { api } from "../../api/API"
import { useEffect, useState } from "react";
import { LoaderWithError } from "../../ui/LoaderWithError";

const EditTodo = ({ id }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchTodo = async () => {
        try {
            const { data } = await api.get(`/todos/${id}`);
            setLoading(true);
            setData(data);
        } catch (error) {
            setError("Ошибка при получении Todo");
        } finally {
            setLoading(false);
        }
    };


    const fetchEditTodo = async (body) => {
        try {
            await api.patch(`/todos/${id}`, body);
        } catch (error) {
            setError("Ошибка при изменении Todo");
            throw err;
        }
    }

    useEffect(() => {
        fetchTodo();
    }, [id]);

    const editTodoFn = async (values) => {
        await fetchEditTodo(values)
    };

    return (
        <LoaderWithError isLoading={loading} error={error}>
            {data !== null && <TodosForm
                title={'Save'}
                editTodoFn={editTodoFn}
                initialValues={{
                    todo: data.todo,
                    completed: data.completed,
                    userId: String(data.userId)
                }} />}
        </LoaderWithError>
    )
}

export default EditTodo;