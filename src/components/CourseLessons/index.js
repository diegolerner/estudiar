
import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../../Context';
import { Skeleton } from '../Skeleton';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MdBuild } from "react-icons/md";
import { ListCard } from "../ListCard";

const CourseLessons = (course) => {

    //const { token } = useContext(Context);
    const [invitationCode, setInvitationCode] = useState('');
    const [picture, setPicture] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [title, setTitle] = useState('');
    const [lesson, setLesson] = useState({});
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(false);


    useEffect(() => {
        if (course.course) {
            const { codigoInvitacion, imagen, imagen_perfil, lecciones, nombre } = course.course;
            setInvitationCode(codigoInvitacion);
            setPicture(imagen);
            setProfilePicture(imagen_perfil);
            setTitle(nombre);
            setLessons(lecciones);
            setLoading(false);
            console.log({ codigoInvitacion, imagen, imagen_perfil, lecciones, nombre });
        }

    }, []);

    const openModal = (lessonId) => {
        const lesson = lessons.find(lesson => lesson.id === lessonId);
        console.log({lesson});
        setLesson(lesson);
        setShow(true);
    }

    const handleClose = () => { 
        setLesson({});
        setShow(false);
     }

    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}> Close </Button>
                    <Button variant="primary" onClick={handleClose}> Save Changes </Button>
                </Modal.Footer>
            </Modal>

            {
                loading ?
                    <Skeleton count="1" color="#f4f4f4" /> : (
                        <div>
                            <h3>{title}</h3>
                            {lessons && lessons.map(courseLesson => {
                                return (
                                    <React.Fragment key={`course-${courseLesson.id}`}>
                                        <ListCard
                                            title={courseLesson.nombre}
                                            subtitle={`${courseLesson.modulos.length} modulos`}
                                            action={<Button onClick={() => {openModal(courseLesson.id)}} className="float-right"> <MdBuild />  </Button>}
                                        />
                                    </React.Fragment>
                                )
                            })}
                        </div>
                    )
            }

        </div>
    )
}
export default CourseLessons;