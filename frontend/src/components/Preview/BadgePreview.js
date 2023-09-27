import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ImageLoader } from '@components';

const BadgePreview = ({ badge }) => {
    return (
        <div className="badge__header container__background">
            <div className="preview__container">
                <ImageLoader alt={badge.name} prependGateway={true} src={badge.image_hash} />
            </div>

            <div className="content">
                <h1 className="title">
                    {badge.name}
                    <div className="icons">{badge.account_bound && <FontAwesomeIcon icon={['fal', 'fa-lock']} />}</div>
                </h1>

                <p className="description">{badge.description}</p>

                <div className="pill">
                    <span>{`#${badge.token_id}`}</span>
                </div>
            </div>
        </div>
    );
};

export { BadgePreview };
