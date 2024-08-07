"""added description to Itinerary and image_url to Destination

Revision ID: 998a19079b79
Revises: d3d601116487
Create Date: 2024-08-07 19:04:46.574855

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '998a19079b79'
down_revision = 'd3d601116487'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('destinations', schema=None) as batch_op:
        batch_op.add_column(sa.Column('image_url', sa.String(), nullable=True))

    with op.batch_alter_table('itineraries', schema=None) as batch_op:
        batch_op.add_column(sa.Column('itinerary_description', sa.String(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('itineraries', schema=None) as batch_op:
        batch_op.drop_column('itinerary_description')

    with op.batch_alter_table('destinations', schema=None) as batch_op:
        batch_op.drop_column('image_url')

    # ### end Alembic commands ###
