import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { dateParser, isNotEmpty } from "../Utils"
import FollowHandler from "../Profil/FollowHandler"
import LikeButton from "./LikeButton"

const Card = ({ post }) => {
    const [isLoading, setIsLoading] = useState(true)
    const usersData = useSelector((state) => state.usersReducer)
    const userData = useSelector((state) => state.userReducer)

    useEffect(() => {
        isNotEmpty(usersData[0]) && setIsLoading(false)
    }, [usersData])

    return (
        <li className="card-container" key={post._id}>
            {isLoading ? (
                <i className="fas fa-spinner fa-spin"></i>
            ) : (
                <>
                    <div className="card-left">
                        <img
                            src={
                                isNotEmpty(usersData[0]) &&
                                usersData
                                    .map((user) => {
                                        if (user._id === post.posterId) {
                                            return user.picture
                                        }
                                    })
                                    .join("")
                            }
                            alt="poster-pic"
                        />
                    </div>
                    <div className="card-right">
                        <div className="card-header">
                            <div className="pseudo">
                                <h3>
                                    {isNotEmpty(usersData[0]) &&
                                        usersData
                                            .map((user) => {
                                                if (
                                                    user._id === post.posterId
                                                ) {
                                                    return user.pseudo
                                                }
                                            })
                                            .join("")}
                                </h3>
                                {post.posterId !== userData._id && (
                                    <FollowHandler
                                        idToFollow={post.posterId}
                                        type={"card"}
                                    />
                                )}
                            </div>
                            <span>{dateParser(post.createdAt)}</span>
                        </div>
                        <p>{post.message}</p>
                        {post.picture && (
                            <img
                                src={post.picture}
                                alt="card-pic"
                                className="card-pic"
                            />
                        )}
                        {post.video && (
                            <iframe
                                title={post._id}
                                width="500"
                                height="300"
                                src={post.video}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                                allowFullScreen
                            />
                        )}
                        <div className="card-footer">
                            <div className="comment-icon">
                                <img
                                    src="./img/icons/message1.svg"
                                    alt="comment"
                                />
                                <span>{post.comments.length}</span>
                            </div>
                            <LikeButton post={post} />
                            <img src="./img/icons/share.svg" alt="share"/>
                        </div>

                    </div>
                </>
            )}
        </li>
    )
}

export default Card